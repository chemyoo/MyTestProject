var formSerializeObject = function (form) {
    var json = {};
    $(form).serializeArray().map(function(x){json[x.name]=x.value;});
    return json;
}

var formSerialize() = function (form) {
	return $(form).serialize();
}
