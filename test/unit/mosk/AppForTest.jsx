import React from 'react'
import events from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import { MockRoute } from "./moskRoute";
import { Application } from '../../../src/client/Application';
import { MockStore } from "./moskStore";

export const AppForTest = ({ path }) => {
    return (
        <MockStore>
            <MockRoute path={path}>
                <Application />
            </MockRoute>
        </MockStore>
    );
}
