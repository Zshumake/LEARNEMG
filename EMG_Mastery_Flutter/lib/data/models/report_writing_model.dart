enum RWExampleType { header, content, tabular }

class RWExampleItem {
  final RWExampleType type;
  final String text;

  const RWExampleItem({required this.type, required this.text});
}

class RWSafetyTip {
  final String label;
  final String text;

  const RWSafetyTip({required this.label, required this.text});
}

class RWPearlBox {
  final String title;
  final String content;

  const RWPearlBox({required this.title, required this.content});
}

class RWStep {
  final String id;
  final String title;
  final String icon;
  final String color;
  final String keyRequirement;
  final String keyRequirementDescription;
  final List<RWSafetyTip> safetyTips;
  final RWPearlBox pearlBox;
  final List<RWExampleItem> example;

  const RWStep({
    required this.id,
    required this.title,
    required this.icon,
    required this.color,
    required this.keyRequirement,
    required this.keyRequirementDescription,
    required this.safetyTips,
    required this.pearlBox,
    required this.example,
  });
}

class RWScenario {
  final String id;
  final String title;
  final String finding;
  final String impression;

  const RWScenario({
    required this.id,
    required this.title,
    required this.finding,
    required this.impression,
  });
}
