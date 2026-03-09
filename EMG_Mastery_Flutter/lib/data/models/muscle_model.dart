class MuscleModel {
  final String name;
  final String nerve;
  final List<String> roots;
  final String region; // 'UE' or 'LE'
  final String peripheralNerve;
  final String? cord;
  final String actions;

  const MuscleModel({
    required this.name,
    required this.nerve,
    required this.roots,
    required this.region,
    required this.peripheralNerve,
    this.cord,
    required this.actions,
  });
}

class LesionSiteModel {
  final String name;
  final String type; // 'root', 'plexus', 'peripheral'
  final List<String> muscles;

  const LesionSiteModel({
    required this.name,
    required this.type,
    required this.muscles,
  });
}
