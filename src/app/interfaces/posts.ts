
export interface ModelPosts {
      id_new: string;
      content: string;
      count_comments: number;
      external_url_new: string;
      image_new: string;
      liked_by_user: [];
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
}

export interface ModelPostsData {
      posts: ModelPosts[];
}
