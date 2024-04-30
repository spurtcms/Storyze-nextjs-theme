
export const GET_POSTS_LIST_QUERY = `query($channelId: Int, $title:String $categoryId: Int,$limit: Int!,$offset: Int!){
  channelEntriesList(channelId: $channelId,title:$title,categoryId: $categoryId, limit: $limit,offset: $offset){
    channelEntriesList{
      id
      title
      metaTitle
      metaDescription
      slug
      description
      userId
      channelId
      status
      isActive
      createdOn
      createdBy
      modifiedBy
      modifiedOn
      coverImage
      thumbnailImage
      metaTitle
      metaDescription
      keyword
      categoriesId
      relatedArticles
      featuredEntry
      categories{
        id
        categoryName
        imagePath
        parentId
      }
      authorDetails{
        AuthorId
        FirstName
        LastName
        ProfileImagePath
        IsActive
        CreatedBy
      }
    }
    count
  }
}
  `;

  export const GET_POSTS_CATEGORYLIST_QUERY = `query($hierarchylevel: Int!){
    categoriesList(hierarchyLevel: $hierarchylevel){
      categories{
        id
        categoryName
        categorySlug
        parentId
      }
    }
  }
  `;

  
export const GET_POSTS_SLUG_QUERY = `query($slug: String!){
    channelEntryDetail(slug:$slug){
        id
        title
        metaTitle
        metaDescription
        slug
        description
        userId
        channelId
        status
        isActive
        coverImage
        categoriesId
        categories{
          id
          categoryName
          imagePath
          parentId
        }
        authorDetails{
          FirstName
          LastName
          Email
          MobileNo
          ProfileImagePath
        }
      }
    }
  `

  export const GET_POSTS_CHANNELLIST_QUERY=`query($limit: Int!,$offset: Int!){
    channelList(limit:$limit,offset:$offset){
      channellist{
        id
        channelName
        channelDescription
        slugName
        fieldGroupId
        isActive
        createdOn
        createdBy
        modifiedOn
        modifiedBy
      }
    }
  }`

  export const GET_POSTS_CHANNELLIST_SLUG_QUERY=`
  query($channelSlug:String!){
    channelDetail(channelSlug:$channelSlug){
      id
      slugName
      channelName
      channelDescription
    }
  }`
  

  export const GET_POSTS_QUERY_CATEGORY = `query($hierarchylevel: Int!){
    categoriesList(hierarchyLevel: $hierarchylevel){
      categories{
        id
        categoryName
        categorySlug
        parentId
      }
    }
  }
  `;