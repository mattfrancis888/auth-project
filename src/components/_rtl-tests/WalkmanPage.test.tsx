import Root from "Root";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
    act,
} from "@testing-library/react";
import history from "browserHistory";
afterEach(() => {
    cleanup();
});
let app: RenderResult;

beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null),
        },
        writable: true,
    });
    //NOTE: creating key/val paris for local storage DOES NOT WORK IF WE PUT IT IN BEFOREACH!!
    //We also cannot use app in BEFOREEACH! otherwise our localstorage would not load
    // window.localStorage.setItem("token", "hi");
    // app = render(
    //     <Root>
    //         <MemoryRouter initialEntries={["/walkman"]} initialIndex={0}>
    //             <Routes />
    //         </MemoryRouter>
    //     </Root>
    // );
});

describe("Sections that appear in walkman page(with path '/walkman' ) ", () => {
    //Mock token in localstorage, when user enters /walkman they should have a token or else they'll be re-directed to
    //homepage
    window.localStorage.setItem("token", "hihihihihihi");
    app = render(
        <Root>
            <MemoryRouter initialEntries={["/walkman"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );
    test("Shows Spotify Playlist ", () => {
        expect(app.getByTestId("spotifyPlaylist")).toBeInTheDocument();
        expect(app.getByTestId("applePlaylist")).toBeInTheDocument();
        expect(app.getByTestId("youtubePlaylist")).toBeInTheDocument();
    });
});
