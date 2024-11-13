class Item {
  final int id;
  final String title;
  final String description;
  final String imageUrl;
  final int userId;

  Item({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.userId,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      imageUrl: json['image_url'],
      userId: json['user_id'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'image_url': imageUrl,
      'user_id': userId,
    };
  }
}
