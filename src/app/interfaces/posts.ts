
export interface ModelPosts {
      id_new: string;
      content: string;
      count_comments: number;
      external_url_new: string;
      image_base64: string;
      image_new: string;
      liked_by_user: boolean;
      likes: number;
      publication_date: string;
      title: string;
      author_fistName: string;
      author_headline: string;
      author_id: string;
      author_image_perfil: string;
      author_lastName: string;
      author_profession: string;
      metadataTitle: string;
      metadataDescription: string;
      metadataImage: string;
      userPk: string;
      pk_post: string;

}

export interface ModelComments{
      id_comment: string;
      comment: string;
      comment_firstname_author: string;
      comment_lastname_author: string;
      comment_author_image: string;
      like_by_user: string;
      likes: number;
      count_recomments: number;
      id_author: string;
}

export interface ModelCommentData{
      comment: string;
      pk_profile: string;
      pk_post: string;
}

export interface ModelRecomments{
      recomment_id_author: string;
      recomment_id: string;
      recomment: string;
      recomment_firstname_author: string;
      comrecomment_lastname_author: string;
      recomment_author_image: string;
}

export interface ModelRecommentData{
      comment: string;
      pk_profile: string;
      pk_comment: string;
}

export interface ModelPostsData {
      posts: ModelPosts[];
}
