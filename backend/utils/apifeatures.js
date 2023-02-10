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
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        /**
         * Applying filter for price & rating
         * stringifying the queryCopy since it's an object but here we need to compare so it's need to converted into
         * string
         */
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr)); // using JSON.parse to convert string into object format

        return this;
    }

    pagination(resultPerPage)
    {
        // Using JS Number() method converting string to number format
        const currentPage = Number(this.queryStr.page) || 1;

        // basic math logic to skip data a/c to page number
        const skip = resultPerPage * (currentPage -1);

        // limit() & skip() is a mongoDB fun used to restricted manipulation of data from DB
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

};

module.exports = ApiFeatures 