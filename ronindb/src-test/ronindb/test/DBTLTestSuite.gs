package ronindb.test

uses gw.test.Suite
uses junit.framework.Test

class DBTLTestSuite extends Suite<DBTLTestSuite> {

  static function suite() : Test {
    return new DBTLTestSuite()
  }

}
