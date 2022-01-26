import Model, { attr } from '@ember-data/model';

export default class CommentModel extends Model {
  // @attr currentUser;
  // @attr comments;
  // "id": 1,
  //      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  //      "createdAt": "1 month ago",
  //      "score": 12,
  //      "user": {
  //        "image": {
  //          "png": "../assets/images/image-amyrobson.png",
  //          "webp": "../assets/images/image-amyrobson.webp"
  //        },
  //        "username": "amyrobson"
  //      },
  //      "replies": []
  // @attr id;
  @attr content;
  @attr createdAt;
  @attr score;
  @attr webp;
  @attr username;
  @attr replies;
}
