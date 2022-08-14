
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
