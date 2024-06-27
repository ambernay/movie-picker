export default async (request, context) => {

    const countryCode = context.geo?.country?.code;
    const countryName = context.geo?.country?.name;
    return Response.json({countryCode, countryName});
};