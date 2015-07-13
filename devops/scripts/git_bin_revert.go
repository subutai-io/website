package main

import (
    "fmt"
    "log"
    "bufio"
    "os"
    "io"
    "runtime"
    "strings"
    "path/filepath"
)

const LOG_FILE = "git-bin-revert.log"
const MAX_DEPTH = 3
const FILE_SEARCHED = ".git-bin"
const FILES_RESTORED_DIR = ".img_restored"

func main() {
    // filepath of file
    _, path, _, _ := runtime.Caller(0)
    path = filepath.Dir( path )

    initLog( path )

    gitPath := path
    if !searchGitBinFile( &gitPath ) {
        log.Fatalf( "Cannot find in %d closest dirs: %s", MAX_DEPTH, FILE_SEARCHED )
    }

    inFile, err := os.Open( filepath.Join(gitPath, FILE_SEARCHED) )

    if err != nil {
        log.Fatalf("error openning file: %v", err)
    }
    defer inFile.Close()

    scanner := bufio.NewScanner(inFile)
    scanner.Split(bufio.ScanLines)

    os.MkdirAll( filepath.Join( path, FILES_RESTORED_DIR ) ,0775);


    for scanner.Scan() {
        vals := strings.Split(scanner.Text(), "|")
        fmt.Printf("Copying %s --> %s\n",
            filepath.Join( gitPath, ".git", "bin-cache", "wf", vals[2] ),
            filepath.Join( path, FILES_RESTORED_DIR, vals[0] ))

        //CopyFile( filepath.Join( gitPath, ".git", "bin-cache", "wf", vals[2] ), filepath.Join( path, FILES_RESTORED_DIR, vals[0] ) )
        //if _, err := os.Stat(filename); os.IsNotExist(err) {
        //    fmt.Printf("no such file or directory: %s", filename)
        //    return
        //}

        //os.Copy()

        //vals[2] // find
        //vals[0] // path
    }
}

func initLog( path string ) {
    // log file
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

        *path = filepath.Join(*path, "../")
    }

    return false
}

func CopyFile( src, dst string ) (err error) {
    sfi, err := os.Stat(src)
    if err != nil {
        return
    }
    if !sfi.Mode().IsRegular() {
        return fmt.Errorf("CopyFile: non-regular source file %s (%q)", sfi.Name(), sfi.Mode().String())
    }
    dfi, err := os.Stat(dst)
    if err != nil {
        if !os.IsNotExist(err) {
            return
        }
    } else {
        if !dfi.Mode().IsRegular() {
            return fmt.Errorf("CopyFile: non-regular destination file %s (%q)", dfi.Name(), dfi.Mode().String())
        }
        if os.SameFile(sfi, dfi) {
            return
        }
    }
    if err = os.Link(src, dst); err == nil {
        return
    }
    err = copyFileContents(src, dst)
    return
}

func copyFileContents( src, dst string ) (err error) {
    in, err := os.Open(src)
    if err != nil {
        return
    }
    defer in.Close()
    out, err := os.Create(dst)
    if err != nil {
        return
    }
    defer func() {
        cerr := out.Close()
        if err == nil {
            err = cerr
        }
    }()
    if _, err = io.Copy(out, in); err != nil {
        return
    }
    err = out.Sync()
    return
}
