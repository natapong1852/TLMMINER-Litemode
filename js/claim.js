class claims{
    async getNFT(account, eos_rpc, aa_api) {
        const nft_res = await eos_rpc.get_table_rows({
            code: mining_account, 
            scope: mining_account, 
            table: 'claims', 
            limit: 10,
            lower_bound: account, 
            upper_bound: account
        });
        const nft = [];
        if (nft_res.rows.length){
            const items_p = nft_res.rows[0].template_ids.map((template_id) => {
                return aa_api.getTemplate("alien.worlds",template_id)
            });
            return await Promise.all(items_p);
        }
        return nft;
    }

}




