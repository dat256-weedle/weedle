import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { GlobalWithFetchMock } from "jest-fetch-mock";

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
import { JSDOM } from "jsdom";

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src: any, target: any) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetchMock = customGlobal.fetch;
Enzyme.configure({ adapter: new Adapter() });
