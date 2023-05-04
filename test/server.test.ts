import "jest"
import express from "express"
const http = require("http")
// const APIServer = require("../source/server")
import * as APIServer from "../source/server"


test("testing", () =>{
    const mockSetup = jest.spyOn(APIServer, "setup")
    const mockCreateServer = jest.spyOn(http, "createServer")
    
    mockSetup.mockImplementation(() : any => console.log("mock setup() called"))
    mockCreateServer.mockImplementation(() => {
        console.log("mock createServer() called")
        return {listen: jest.fn()}
    })

    APIServer.start()
    expect(mockCreateServer).toBeCalledTimes(1)

    expect(mockSetup).toBeCalledTimes(1)

    mockSetup.mockRestore()
    mockCreateServer.mockRestore()
})