
export interface ModelPosts {
      id_new: string;
      content: string;
      count_comments: string;
      external_url_new: string;
      image_new: string;
      liked_by_user: [];
      likes: string;
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
}

export interface ModelPostsData {
      posts: ModelPosts[];
}
