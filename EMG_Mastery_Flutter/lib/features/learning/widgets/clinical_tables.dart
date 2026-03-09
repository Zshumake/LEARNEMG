import 'package:flutter/material.dart';
import '../../../data/models/clinical_case_model.dart';

class ClinicalNCSTable extends StatelessWidget {
  final NCSStudies ncs;

  const ClinicalNCSTable({super.key, required this.ncs});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (ncs.sensory != null && ncs.sensory!.isNotEmpty) ...[
          _SectionHeader("Sensory Nerve Conduction Results"),
          _buildSensoryTable(),
          const SizedBox(height: 24),
        ],
        if (ncs.motor != null && ncs.motor!.isNotEmpty) ...[
          _SectionHeader("Motor Nerve Conduction Results"),
          _buildMotorTable(),
          const SizedBox(height: 24),
        ],
        if (ncs.comparison != null && ncs.comparison!.isNotEmpty) ...[
          _SectionHeader("Specialized Studies (Comparison)"),
          _buildComparisonTable(),
          const SizedBox(height: 24),
        ],
      ],
    );
  }

  Widget _SectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: const TextStyle(
          color: Colors.white70,
          fontSize: 14,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  Widget _buildSensoryTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columnSpacing: 12,
        horizontalMargin: 10,
        headingRowHeight: 40,
        dataRowMinHeight: 32,
        dataRowMaxHeight: 48,
        headingTextStyle: const TextStyle(
          color: Colors.cyan,
          fontSize: 11,
          fontWeight: FontWeight.bold,
        ),
        columns: const [
          DataColumn(label: Text("Nerve")),
          DataColumn(label: Text("Peak (ms)")),
          DataColumn(label: Text("Amp (µV)")),
          DataColumn(label: Text("CV (m/s)")),
        ],
        rows: ncs.sensory!
            .map(
              (s) => DataRow(
                cells: [
                  DataCell(
                    Text(
                      s.name,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: s.peak ?? "",
                      isAbnormal: s.abnormal,
                      type: 'latency',
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: s.amp ?? "",
                      isAbnormal: s.abnormal,
                      type: 'amp',
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: s.velocity ?? "",
                      isAbnormal: s.abnormal,
                      type: 'amp',
                    ),
                  ),
                ],
              ),
            )
            .toList(),
      ),
    );
  }

  Widget _buildMotorTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columnSpacing: 12,
        horizontalMargin: 10,
        headingRowHeight: 40,
        dataRowMinHeight: 32,
        dataRowMaxHeight: 48,
        headingTextStyle: const TextStyle(
          color: Colors.cyan,
          fontSize: 11,
          fontWeight: FontWeight.bold,
        ),
        columns: const [
          DataColumn(label: Text("Nerve")),
          DataColumn(label: Text("Latency (ms)")),
          DataColumn(label: Text("Amp (mV)")),
          DataColumn(label: Text("CV (m/s)")),
        ],
        rows: ncs.motor!
            .map(
              (m) => DataRow(
                cells: [
                  DataCell(
                    Text(
                      m.name,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: m.latency ?? "",
                      isAbnormal: m.abnormal,
                      type: 'latency',
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: m.amp ?? "",
                      isAbnormal: m.abnormal,
                      type: 'amp',
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: m.velocity ?? "",
                      isAbnormal: m.abnormal,
                      type: 'amp',
                    ),
                  ),
                ],
              ),
            )
            .toList(),
      ),
    );
  }

  Widget _buildComparisonTable() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columnSpacing: 12,
        horizontalMargin: 10,
        headingRowHeight: 40,
        dataRowMinHeight: 32,
        dataRowMaxHeight: 48,
        headingTextStyle: const TextStyle(
          color: Colors.cyan,
          fontSize: 11,
          fontWeight: FontWeight.bold,
        ),
        columns: const [
          DataColumn(label: Text("Study")),
          DataColumn(label: Text("A")),
          DataColumn(label: Text("B")),
          DataColumn(label: Text("Delta")),
        ],
        rows: ncs.comparison!
            .map(
              (c) => DataRow(
                cells: [
                  DataCell(
                    Text(
                      c.name,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  DataCell(
                    Text(
                      c.measureA ?? "",
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  DataCell(
                    Text(
                      c.measureB ?? "",
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  DataCell(
                    _KineticValue(
                      value: c.deltaP ?? "",
                      isAbnormal: c.abnormal,
                      type: 'latency',
                    ),
                  ),
                ],
              ),
            )
            .toList(),
      ),
    );
  }
}

class ClinicalEMGTable extends StatelessWidget {
  final List<EMGFinding> findings;

  const ClinicalEMGTable({super.key, required this.findings});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeader("Needle EMG Examination Details"),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: DataTable(
            columnSpacing: 10,
            horizontalMargin: 8,
            headingRowHeight: 40,
            dataRowMinHeight: 32,
            dataRowMaxHeight: 56,
            headingTextStyle: const TextStyle(
              color: Colors.cyan,
              fontSize: 10,
              fontWeight: FontWeight.bold,
            ),
            columns: const [
              DataColumn(label: Text("Muscle")),
              DataColumn(label: Text("Fib/PSW")),
              DataColumn(label: Text("Motor Units")),
              DataColumn(label: Text("Recruitment")),
            ],
            rows: findings
                .map(
                  (f) => DataRow(
                    cells: [
                      DataCell(
                        Text(
                          f.muscle,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 11,
                          ),
                        ),
                      ),
                      DataCell(
                        _KineticValue(
                          value: f.fibs ?? "0",
                          isAbnormal: f.abnormal,
                          type: 'latency',
                        ),
                      ),
                      DataCell(
                        Text(
                          f.motorUnits ?? "Nml",
                          style: TextStyle(
                            color: f.abnormal ? Colors.orange : Colors.white70,
                            fontSize: 11,
                          ),
                        ),
                      ),
                      DataCell(
                        Text(
                          f.recruitment ?? "Nml",
                          style: TextStyle(
                            color: f.abnormal ? Colors.orange : Colors.white70,
                            fontSize: 11,
                          ),
                        ),
                      ),
                    ],
                  ),
                )
                .toList(),
          ),
        ),
      ],
    );
  }

  Widget _SectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: const TextStyle(
          color: Colors.white70,
          fontSize: 14,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}

class _KineticValue extends StatelessWidget {
  final String value;
  final bool isAbnormal;
  final String type; // 'latency' or 'amp'

  const _KineticValue({
    required this.value,
    required this.isAbnormal,
    required this.type,
  });

  @override
  Widget build(BuildContext context) {
    Color textColor = Colors.white70;
    if (isAbnormal) {
      textColor = type == 'latency' ? Colors.redAccent : Colors.orangeAccent;
    }

    return Text(
      value,
      style: TextStyle(
        color: textColor,
        fontWeight: isAbnormal ? FontWeight.bold : FontWeight.normal,
        fontSize: 12,
      ),
    );
  }
}
