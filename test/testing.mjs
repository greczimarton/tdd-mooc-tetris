import { Assertion } from "chai";

export function normalize(s) {
  return s.replaceAll(" ", "").trim() + "\n";
}

Assertion.addMethod("equalShape", function (expected) {
  const actual = this._obj;
  new Assertion(actual).to.be.a("string");

  expected = normalize(expected);
  this.assert(
    actual === expected,
    "expected: \n#{this}\nto equal: \n#{exp}\n but got: \n#{act}",
    "expected: \n#{this}\nto not equal: \n#{act}",
    expected,
    actual
  );
});
