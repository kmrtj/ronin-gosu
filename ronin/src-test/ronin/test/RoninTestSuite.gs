package ronin.test

uses gw.test.Suite
uses junit.framework.Test

class RoninTestSuite extends Suite<RoninTestSuite> {

  static function suite() : Test {
    return new RoninTestSuite()
  }

}
