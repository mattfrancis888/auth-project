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
afterEach(() => {
    cleanup();
});
let app: RenderResult;

beforeEach(async () => {
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/walkman"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );
});

// test("should save to localStorage", () => {
//     jest.spyOn(window.localStorage.__proto__, "setItem");
//     window.localStorage.__proto__.setItem = jest.fn();

//     // assertions as usual:
//     expect(localStorage.setItem).toHaveBeenCalled();
// });

// describe("Sections that appear in walkman page(with path '/walkman' ) ", () => {
//     test("Shows Spotify Playlist ", () => {
//         expect(app.getByTestId("spotifyPlaylist")).toBeInTheDocument();
//     });
// });
