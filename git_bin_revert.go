package main

import (
    "fmt"
    "log"
    "bufio"
    "os"
)

const LOG_FILE = git-bin-revert.log

func main() {
    // log file
    logFile, err := os.OpenFile(LOG_FILE, os.O_RDWR | os.O_CREATE | os.O_APPEND, 0666)
    if err != nil {
        log.Fatalf("error opening file: %v", err)
    }
    defer logFile.Close()

    log.SetOutput(logFile)

    inFile, err := os.Open(".git-bin")

    if err != nil {
        log.Fatalf("error openning file: %v", err)
    }

    scanner := bufio.NewScanner(inFile)
    scanner.Split(bufio.ScanLines)

    for scanner.Scan() {
        fmt.Println(scanner.Text())
    }

    inFile.Close()
}
