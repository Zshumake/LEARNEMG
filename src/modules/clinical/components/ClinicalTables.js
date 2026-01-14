export const ClinicalTables = {
    formatValue: function (val, isAbnormal) {
        return isAbnormal ? `<strong>${val}</strong>` : val;
    },

    generateNCSTable: function (caseData) {
        let html = '';
        const ncs = caseData.ncsResults || caseData.ncsStudies;

        if (!ncs) return '<p>No NCS data available.</p>';

        // Sensory Table
        const sensory = ncs.antiSensorySummary || ncs.sensoryStudies;
        if (sensory && sensory.length > 0) {
            html += '<h4 class="clinical-report-header">Sensory Nerve Conduction Studies</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Sites</th>
                            <th>Onset (ms)</th>
                            <th>Peak (ms)</th>
                            <th>Amp (µV)</th>
                            <th>Dist (cm)</th>
                            <th>Vel (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            sensory.forEach(s => {
                html += `
                    <tr>
                        <td class="text-left">${s.site || s.nerve}</td>
                        <td>${s.onset || s.nr || '-'}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.peak || s.peakLatency}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.ptAmp || s.amplitude}</td>
                        <td>${s.dist || '-'}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.vel || s.cv || '-'}</td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
        }

        // Motor Table
        const motor = ncs.motorSummary || ncs.motorStudies;
        if (motor && motor.length > 0) {
            html += '<h4 class="clinical-report-header">Motor Nerve Conduction Studies</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Sites</th>
                            <th>Onset (ms)</th>
                            <th>Amp (mV)</th>
                            <th>Dist (cm)</th>
                            <th>Vel (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            motor.forEach(m => {
                html += `
                    <tr>
                        <td class="text-left">${m.site || m.nerve}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.onset || m.distalLatency}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.opAmp || m.amplitude}</td>
                        <td>${m.dist || '-'}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.vel || m.cv || '-'}</td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
        }

        // Comparison Table
        const comparison = ncs.comparisonSummary;
        if (comparison && comparison.length > 0) {
            html += '<h4 class="clinical-report-header">Comparison Studies</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Study</th>
                            <th>Site 1</th>
                            <th>Site 2</th>
                            <th>Diff (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            comparison.forEach(c => {
                html += `
                    <tr>
                        <td class="text-left">${c.site}</td>
                        <td>${c.median.peak}</td>
                        <td>${c.ulnar.peak}</td>
                        <td class="${c.abnormal ? 'abnormal-value' : ''}">${c.deltaP}</td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
        }

        return html;
    },

    generateEMGTable: function (emgFindings) {
        if (!emgFindings || emgFindings.length === 0) return '';

        let html = '<h4 class="clinical-report-header">Needle EMG Examination</h4>';
        html += `
            <table class="clinical-report-table">
                <thead>
                    <tr>
                        <th class="text-left">Muscle</th>
                        <th>Ins Act</th>
                        <th>Fibs</th>
                        <th>PSW</th>
                        <th>Amp</th>
                        <th>Dur</th>
                        <th>Recrt</th>
                    </tr>
                </thead>
                <tbody>
        `;

        emgFindings.forEach(f => {
            html += `
                <tr class="${f.abnormal ? 'abnormal-row' : ''}">
                    <td class="text-left">${f.muscle}</td>
                    <td>${f.insAct || f.insertionalActivity}</td>
                    <td class="${f.fibs && f.fibs !== 'Nml' ? 'abnormal-value' : ''}">${f.fibs || f.spontaneousActivity || 'Nml'}</td>
                    <td>${f.psw || 'Nml'}</td>
                    <td>${f.amp || f.motorUnits || 'Nml'}</td>
                    <td>${f.dur || 'Nml'}</td>
                    <td class="${f.recrt && f.recrt !== 'Nml' ? 'abnormal-value' : ''}">${f.recrt || f.recruitment}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        return html;
    }
};
