import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import waitForExpect from "wait-for-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import { render, cleanup, RenderResult } from "@testing-library/react";

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

describe("Sections that automatically appear in homepage (with path '/' ) ", () => {
    test("Shows <Header>", () => {
        expect(app.getByTestId("marvelLogo")).toBeInTheDocument();
    });
});
