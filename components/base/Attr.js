var Attr = function (_attr, $el) {
    let _$el = $el;
    if (_attr) {
        for (var prop in _attr) {
            _$el.attr(prop, _attr[prop]);
            this[prop] = _attr[prop];
        }
    }
    return new Proxy(this, {
        deleteProperty: function (target, property) {
            _$el.removeAttr(property);
            Reflect.deleteProperty(target, property);
            return true;
        },
        set: function (target, property, value, receiver) {
            if (value && !isString(value) && isNaN(value)) { 
                _$el.attr(property, JSON.stringify(value));
            } else if (value != null)
                _$el.attr(property, value);
            target[property] = value;
            return true;
        },
        get: function (target, property, receiver) {
            if (!isSymbol(property) && target[property] == null) {
                let v = _$el.attr(property);
                if(v)
                    target[property] = JSON.parse(_$el.attr(property));
            }
            return Reflect.get(...arguments);
        }
    });
};