const res = (data: object, options?: ResponseInit | undefined) => {
    return new Response(JSON.stringify(data), options)
}
export default res;

