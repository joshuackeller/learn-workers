const res = (data: object, options?: any) => {
    return new Response(
        JSON.stringify(data, options)
    )
}

export default res;