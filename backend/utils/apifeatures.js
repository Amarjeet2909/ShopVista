/**
 * In this file Api Feature code is there which work is to search/ apply filter on searching
 */
class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search()
    {
        const keyword = this.queryStr.keyword ? {
            name: {
                // $regex and $options is MongoDB keyword and $options: "i" means cosider the seach as case insensitive
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};
        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter()
    {
        /* Assigning value by this type { ...this.Variable_name } means we're passing by value otherwise if we don't
           declare like that and we declare "const queryCopy = this.queryStr" then the queryStr will be passes as reference */
        const queryCopy = {...this.queryStr};

        // Removing some fields for category since this fun is filtering not searching 
    }

};

module.exports = ApiFeatures