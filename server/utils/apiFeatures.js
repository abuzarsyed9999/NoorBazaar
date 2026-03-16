// class ApiFeatures {
//   constructor(query, queryStr) {
//     this.query = query;
//     this.queryStr = queryStr;
//   }

//   // ==============================
//   // Search by keyword
//   // ==============================
//   search() {
//     const keyword = this.queryStr.keyword
//       ? {
//           $or: [
//             { name: { $regex: this.queryStr.keyword, $options: "i" } },
//             { description: { $regex: this.queryStr.keyword, $options: "i" } },
//             { tags: { $regex: this.queryStr.keyword, $options: "i" } },
//           ],
//         }
//       : {};
//     this.query = this.query.find({ ...keyword });
//     return this;
//   }

//   // ==============================
//   // Filter by fields
//   // ==============================
//   filter() {
//     const queryCopy = { ...this.queryStr };

//     // Remove non-filter fields
//     const removeFields = ["keyword", "page", "limit", "sort", "fields"];
//     removeFields.forEach((key) => delete queryCopy[key]);

//     // Advanced filter — gt, gte, lt, lte
//     let queryStr = JSON.stringify(queryCopy);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

//     this.query = this.query.find(JSON.parse(queryStr));
//     return this;
//   }

//   // ==============================
//   // Sort results
//   // ==============================
//   sort() {
//     if (this.queryStr.sort) {
//       const sortBy = this.queryStr.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }
//     return this;
//   }

//   // ==============================
//   // Select specific fields
//   // ==============================
//   limitFields() {
//     if (this.queryStr.fields) {
//       const fields = this.queryStr.fields.split(",").join(" ");
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select("-__v");
//     }
//     return this;
//   }

//   // ==============================
//   // Pagination
//   // ==============================
//   paginate(resPerPage = 12) {
//     const page = Math.max(Number(this.queryStr.page) || 1, 1);
//     const limit = Math.min(Number(this.queryStr.limit) || resPerPage, 50);
//     const skipProducts = limit * (page - 1);

//     this.query = this.query.limit(limit).skip(skipProducts);
//     this.page = page;
//     this.limit = limit;
//     return this;
//   }
// }

// module.exports = ApiFeatures;

const Category = require("../models/Category.model");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // ==============================
  // Search by keyword
  // ==============================
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { name: { $regex: this.queryStr.keyword, $options: "i" } },
            { description: { $regex: this.queryStr.keyword, $options: "i" } },
            { tags: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // ==============================
  // Filter by fields
  // ==============================
  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove non-filter fields
    const removeFields = ["keyword", "page", "limit", "sort", "fields"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // ✅ Remove category — handled separately in filterAsync()
    delete queryCopy.category;

    // Advanced filter — gt, gte, lt, lte
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // ==============================
  // ✅ Async filter for category slug
  // ==============================
  async filterCategory() {
    if (!this.queryStr.category) return this;

    const val = this.queryStr.category;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(val);

    if (isObjectId) {
      // Already an ObjectId — use directly
      this.query = this.query.find({ category: val });
    } else {
      // It's a slug — look up the category
      const category = await Category.findOne({ slug: val }).lean();
      if (category) {
        this.query = this.query.find({ category: category._id });
      } else {
        // No category found — return nothing
        this.query = this.query.find({ category: null });
      }
    }

    return this;
  }

  // ==============================
  // Sort results
  // ==============================
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // ==============================
  // Select specific fields
  // ==============================
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // ==============================
  // Pagination
  // ==============================
  paginate(resPerPage = 12) {
    const page = Math.max(Number(this.queryStr.page) || 1, 1);
    const limit = Math.min(Number(this.queryStr.limit) || resPerPage, 50);
    const skipProducts = limit * (page - 1);

    this.query = this.query.limit(limit).skip(skipProducts);
    this.page = page;
    this.limit = limit;
    return this;
  }
}

module.exports = ApiFeatures;
