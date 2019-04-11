import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { GlobalWithFetchMock } from "jest-fetch-mock";

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetchMock = customGlobal.fetch;
Enzyme.configure({ adapter: new Adapter() });
