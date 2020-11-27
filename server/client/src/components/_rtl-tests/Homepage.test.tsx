import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import waitForExpect from "wait-for-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import history from "browserHistory";

afterEach(() => {
    cleanup();
});
let app: RenderResult;

beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );
});
//“SyntaxError: Unexpected token export” will occur because
//This means, that a file is not transformed through TypeScript compiler,
//e.g. because it is a JS file with TS syntax, or it is published to npm as uncompiled source files.
//Here's what you can do. Use
//https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export

describe("Sections that automatically appear in homepage (with path '/' ) ", () => {
    test("Shows <Header>", () => {
        expect(app.getByTestId("marvelLogo")).toBeInTheDocument();
    });

    test("Shows <Body> ", () => {
        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });
});

test("Show 'Sign In' form when 'Log in' in Header is clicked ", () => {
    expect(app.getByTestId("logInTitle")).toBeInTheDocument();
    act(() => {
        fireEvent.click(app.getByTestId("logInTitle"));
    });
    expect(app.getByTestId("signInButton")).toBeInTheDocument();
});

test("Show 'Register' form when 'Don't have an account? Register one here' in 'Sign In' Form is clicked ", () => {
    expect(app.getByTestId("logInTitle")).toBeInTheDocument();
    act(() => {
        fireEvent.click(app.getByTestId("logInTitle"));
    });
    expect(app.getByTestId("signInButton")).toBeInTheDocument();
    act(() => {
        fireEvent.click(app.getByTestId("registerAccountText"));
    });
    expect(app.getByTestId("registerButton")).toBeInTheDocument();
});

describe("'Sign In' and 'Register' form  on submit button clicked", () => {
    let pushSpy: jest.SpyInstance;

    beforeEach(() => {
        //mocking local storage
        //https://medium.com/javascript-in-plain-english/testing-local-storage-with-testing-library-580f74e8805b
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
            },
            writable: true,
        });
        //Mocking history:
        //https://www.reddit.com/r/reactjs/comments/b1hsno/how_can_i_test_historypush_inside_action/
        pushSpy = jest.spyOn(history, "push");
    });

    test("'Sign In' form on submit", async () => {
        expect(app.getByTestId("logInTitle")).toBeInTheDocument();
        act(() => {
            fireEvent.click(app.getByTestId("logInTitle"));
        });
        expect(app.getByTestId("signInButton")).toBeInTheDocument();

        const signInResponse = {
            token: "asdfsadf12",
        };

        const expectedMockFormValues = {
            email: "hi@gmail.com",
            password: "123",
        };

        fireEvent.change(app.getByTestId("signInTextInput"), {
            target: { value: expectedMockFormValues.email },
        });
        fireEvent.change(app.getByTestId("signInPasswordInput"), {
            target: { value: expectedMockFormValues.password },
        });

        act(() => {
            fireEvent.click(app.getByTestId("signInButton"));
        });

        const signInScope = nock("http://localhost:5000")
            .post("/signin", expectedMockFormValues)
            .reply(200, signInResponse, { "Access-Control-Allow-Origin": "*" });

        await waitForExpect(() => {
            if (!signInScope.isDone()) {
                console.error("pending mocks: %j", signInScope.pendingMocks());
            }
            expect(signInScope.isDone()).toBe(true);
            expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(pushSpy).toBeCalledWith("/walkman");
            pushSpy.mockRestore();
        });
    }, 30000);

    test("'Register' form on submit", async () => {
        expect(app.getByTestId("logInTitle")).toBeInTheDocument();
        act(() => {
            fireEvent.click(app.getByTestId("logInTitle"));
        });
        expect(app.getByTestId("registerAccountText")).toBeInTheDocument();

        const signUpResponse = {
            token: "asdfsadf12",
        };

        const expectedMockFormValues = {
            email: "hi@gmail.com",
            password: "123",
        };

        act(() => {
            fireEvent.click(app.getByTestId("registerAccountText"));
        });

        fireEvent.change(app.getByTestId("registerTextInput"), {
            target: { value: expectedMockFormValues.email },
        });
        fireEvent.change(app.getByTestId("registerPasswordInput"), {
            target: { value: expectedMockFormValues.password },
        });

        act(() => {
            fireEvent.click(app.getByTestId("registerButton"));
        });

        const registerScope = nock("http://localhost:5000")
            .post("/signup", expectedMockFormValues)
            .reply(200, signUpResponse, { "Access-Control-Allow-Origin": "*" });

        await waitForExpect(() => {
            if (!registerScope.isDone()) {
                console.error(
                    "pending mocks: %j",
                    registerScope.pendingMocks()
                );
            }
            expect(registerScope.isDone()).toBe(true);
            expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(pushSpy).toBeCalledWith("/walkman");
            pushSpy.mockRestore();
        });
    }, 30000);
});
