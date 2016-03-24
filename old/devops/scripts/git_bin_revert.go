/*
 * Recreates all binary files stored via git-bin plugin, using .git-bin file
 * in a "FILES_RESTORED_DIR" directory
 */

package main

import (
    "log"
    "bufio"
    "os"
    "io"
    "runtime"
    "strings"
    "path/filepath"
)

const LOG_FILE = "git-bin-revert.log"

// max depth to search file
const MAX_DEPTH = 4

const FILE_SEARCHED = ".git-bin"
const FILES_RESTORED_DIR = ".img_restored"

func main() {
    // get filepath of file
    _, path, _, _ := runtime.Caller(0)
    path = filepath.Dir( path )

    // create log in the same path with running file
    initLog( path )

    // modify path to the FILE_SEARCHED path
    if !searchGitBinFile( &path ) {
        log.Fatalf( "Cannot find in %d closest dirs: %s", MAX_DEPTH, FILE_SEARCHED )
    }

    inFile, err := os.Open( filepath.Join(path, FILE_SEARCHED) )

    if err != nil {
        log.Fatalf("Error openning file: %v", err)
    }
    defer inFile.Close()

    scanner := bufio.NewScanner(inFile)
    scanner.Split(bufio.ScanLines)

    os.MkdirAll( filepath.Join( path, FILES_RESTORED_DIR ) ,0775 );

    // read "FILE_SEARCHED" lines 1 by 1
    for scanner.Scan() {
        vals := strings.Split(scanner.Text(), "|")

        pathSrc := filepath.Join( path, ".git", "bin-cache", "wf", vals[2] )
        pathDest := filepath.Join( path, FILES_RESTORED_DIR, vals[0] )

        log.Printf("Copying %s --> %s\n", pathSrc, pathDest)

        state, err := createIfNotExists( filepath.Dir( pathDest ) )

        if !state || err != nil {
            log.Printf("Couldn't create a directory %s, err: %s\n", filepath.Dir( pathDest ), err)
        } else {
            copyFile( pathSrc, pathDest )
        }
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

        dir, _ := filepath.Split(*path)

        if dir == "" {
            return false
        }

        *path = filepath.Dir( dir )
    }

    return false
}

func createIfNotExists( path string ) ( bool, error ) {
    exists, err := exists( path )

    if err != nil {
        return false, err
    }

    if !exists {
        dir, _ := filepath.Split( path )

        if dir == "" {
            return false, nil
        }

        report, err := createIfNotExists( filepath.Dir( dir ) )

        if err != nil || !report {
            return false, err
        }

        os.Mkdir( path ,0775 )
    }

    return true, err
}

func exists( path string ) ( bool, error ) {
    _, err := os.Stat(path)
    if err == nil { return true, nil }
    if os.IsNotExist(err) { return false, nil }
    return true, err
}

func copyFile( src, dest string ) {
    r, err := os.Open(src)
    if err != nil {
        panic(err)
    }
    defer r.Close()

    w, err := os.Create(dest)
    if err != nil {
        panic(err)
    }
    defer w.Close()

    n, err := io.Copy(w, r)
    if err != nil {
        panic(err)
    }

    log.Println(n)

    return
}