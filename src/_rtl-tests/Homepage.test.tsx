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

afterEach(cleanup);
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

// describe("on submit form ", () => {
//     test("Sign in form on submit", async () => {
//         const updatedArtistData = {
//             token: "asdfsadf12",
//         };

//         act(() => {
//             fireEvent.click(app.getByTestId("signInButton"));
//         });

//         const SIGN_IN_ROUTE = "/signin";
//         const signInScope = nock("http://localhost:5000/")
//             .intercept(SIGN_IN_ROUTE, "OPTIONS")
//             .reply(200, updatedArtistData, {
//                 "Access-Control-Allow-Origin": "*",
//             })
//             .post(SIGN_IN_ROUTE, (body) => body.hearts)
//             .reply(200, updatedArtistData, {
//                 "Access-Control-Allow-Origin": "*",
//             });

//         await waitForExpect(() => {
//             if (!signInScope.isDone()) {
//                 console.error("pending mocks: %j", signInScope.pendingMocks());
//             }
//             expect(signInScope.isDone()).toBe(true);
//         });
//     });
// });
