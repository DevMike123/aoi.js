const { Perms } = require("../../../utils/Constants.js");

module.exports = async (d) => {
  const data = d.util.openFunc(d);
  if (data.err) return d.error(data.err);

  const [channelID, roleoruserId, ...perms] = data.inside.splits;

  const channel = await d.util.getChannel(d, channelID, true);
  if (!channel)
    return d.aoiError.fnError(d, "channel", { inside: data.inside });

  const pms = perms.map((key) => Perms[key]);
  if (pms.includes(undefined))
    return d.aoiError.fnError(
      d,
      "custom",
      { inside: data.inside },
      `Invalid Permissions In`,
    );

  const upms = channel.permissionsFor(roleoruserId).toArray();
  data.result = upms.includes(Perms.admin) ? true : upms && pms.every((p) => upms.includes(p));
  return {
    code: d.util.setCode(data),
  };
};
