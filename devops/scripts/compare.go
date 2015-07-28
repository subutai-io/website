package main

import (
    "log"
    "bufio"
    "os"
    "os/exec"
    "fmt"
    "runtime"
    "strings"
    "path/filepath"
)

const LOG_FILE = "compare_s3.log"
const MAX_DEPTH = 3
const FILE_SEARCHED = ".git-bin"
const FILES_RESTORED_DIR = ".img_restored"

func main() {
    // filepath of file
    _, path, _, _ := runtime.Caller(0)
    path = filepath.Dir( path )

    initLog( path )

    if !searchGitBinFile( &path ) {
        log.Fatalf( "Cannot find in %d closest dirs: %s", MAX_DEPTH, FILE_SEARCHED )
    }

    imgDir := filepath.Join( path, FILES_RESTORED_DIR )
    os.Mkdir( imgDir, 0775 )

    g, err := exec.Command( "/bin/bash", "-c", fmt.Sprintf( "aws s3 sync s3://subutai-website %s", imgDir ) ).Output()
    fmt.Println(string(g))

    if err != nil {
        log.Fatalf("%s", err)
    }

    inFile, err := os.Open( filepath.Join(path, FILE_SEARCHED) )

    if err != nil {
        log.Fatalf("error openning file: %v", err)
    }
    defer inFile.Close()

    scanner := bufio.NewScanner(inFile)
    scanner.Split(bufio.ScanLines)

    d, err := os.Open(imgDir)
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    defer d.Close()

    files, err := d.Readdir(-1)
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }

    var names []string
    var pics []string
    for scanner.Scan() {
        vals := strings.Split(scanner.Text(), "|")
        names = append(names, vals[2])
    }

    for _, file := range files {
        pics = append(pics, file.Name())
        if file.Mode().IsRegular() && !find(file.Name(), names) {

            fmt.Println(file.Name())
        }
    }
    for _, name := range names {
       if !find(name, pics) {
           fmt.Println(name)
       }
    }
}

func find( element string, list []string ) bool {
    for _, file := range list {
        if element == file {
            return true
        }
    }
    return false
}


func initLog( path string ) {
    logFile, err := os.OpenFile( filepath.Join(path, LOG_FILE), os.O_RDWR | os.O_CREATE | os.O_APPEND, 0664 )
    if err != nil {
        log.Fatalf("error opening file: %v", err)
    }
    defer logFile.Close()
    log.SetOutput(logFile)
}

// search for "FILE_SEARCHED", if not found, it tries to search in a parent directory (max parent dirs = MAX_DEPTH)
func searchGitBinFile( path *string ) bool {

    for i := 0; i < MAX_DEPTH; i++ {
        if _, err := os.Stat( filepath.Join(*path, FILE_SEARCHED) ); os.IsNotExist(err) {
            log.Printf("No \"%s\" in directory: %s\n", FILE_SEARCHED, path )
        } else {
            return true
        }

        dir, _ := filepath.Split(*path)

        if dir == "" {
            return false
        }

        *path = filepath.Dir( dir )
    }

    return false
}
