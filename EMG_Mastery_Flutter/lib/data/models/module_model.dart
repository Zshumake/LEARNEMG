class ModuleModel {
  final String id;
  final String title;
  final String description;
  final String? icon;
  final List<String> highlights;
  final bool isCompleted;

  ModuleModel({
    required this.id,
    required this.title,
    required this.description,
    this.icon,
    this.highlights = const [],
    this.isCompleted = false,
  });

  factory ModuleModel.fromJson(Map<String, dynamic> json) {
    return ModuleModel(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      icon: json['customIcon'] as String?,
      highlights:
          (json['highlights'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      isCompleted: false,
    );
  }
}
