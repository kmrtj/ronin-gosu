package gw.db

uses gw.lang.reflect.*

internal class TransactionType extends TypeBase implements ITransactionType {

	var _conn : DBConnection as Connection
	var _typeInfo : TransactionTypeInfo as TypeInfo
	var _typeLoader : DBTypeLoader as TypeLoader

	construct(conn : DBConnection, __typeLoader : DBTypeLoader) {
		_conn = conn
		_typeInfo = new TransactionTypeInfo(this)
		_typeLoader = __typeLoader
	}
	
	property get Name() : String {
		return "${_conn.Namespace}.Transaction"
	}

	property get Namespace() : String {
		return _conn.Namespace
	}
	
	property get RelativeName() : String {
		return "Transaction"
	}

	property get Supertype() : IType {
		return null
	}

	property get Interfaces() : List<IType> {
		return {}
	}

}