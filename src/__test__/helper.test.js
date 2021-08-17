import { polarityReturn } from "../client/js/helper";

describe("Testing the helper.js", () => {
      
    test("testing polarity return", () => {
           expect(polarityReturn( 'P+')).toEqual("strong positive");
           expect(polarityReturn( 'asdsad')).toEqual("asdsad");
})});