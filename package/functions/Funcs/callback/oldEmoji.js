const { Emoji } = require('../../../Utils/helpers/functions.js');

    module.exports = async d => {
    const data = d.util.openFunc(d);

    const [option = 'name'] = data.inside.splits;

    data.result = Emoji( d.data.olde )[option];

    return {
        code: d.util.openFunc(data)
    }
}