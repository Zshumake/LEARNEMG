export const ClinicalTables = {
    formatValue: function (val, isAbnormal) {
        return isAbnormal ? `<span class="abnormal-value">${val}</span>` : val;
    },

    generateNCSTable: function (caseData) {
        let html = '';
        const ncs = caseData.ncsStudies || caseData.ncsResults;

        if (!ncs) return '<p style="color: var(--clinical-text-muted); padding: 20px; text-align: center;">No NCS data available for this case.</p>';

        const sensory = ncs.sensory || ncs.antiSensorySummary || ncs.sensoryStudies;
        const motor = ncs.motor || ncs.motorSummary || ncs.motorStudies;
        const comparison = ncs.comparison || ncs.comparisonSummary;

        if (sensory && sensory.length > 0) {
            html += '<div class="cadwell-table-container">';
            html += '<h4 class="clinical-report-header">Sensory Nerve Conduction Results</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Site</th>
                            <th>Onset (ms)</th>
                            <th>Peak Lat (ms)</th>
                            <th>Amp (µV)</th>
                            <th>Segment (cm)</th>
                            <th>CV (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            sensory.forEach(s => {
                html += `
                    <tr>
                        <td class="text-left" style="font-weight: 600;">${s.name || s.site || s.nerve}</td>
                        <td>${s.onset || '-'}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.peak || s.peakLatency || '-'}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.amp || s.ptAmp || s.amplitude || '-'}</td>
                        <td>${s.dist || '-'}</td>
                        <td class="${s.abnormal ? 'abnormal-value' : ''}">${s.velocity || s.vel || s.cv || '-'}</td>
                    </tr>
                `;
            });
            html += '</tbody></table></div>';
        }

        if (motor && motor.length > 0) {
            html += '<div class="cadwell-table-container">';
            html += '<h4 class="clinical-report-header">Motor Nerve Conduction Results</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Nerve / Site</th>
                            <th>Dist Lat (ms)</th>
                            <th>Amp (mV)</th>
                            <th>Segment (cm)</th>
                            <th>CV (m/s)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            motor.forEach(m => {
                html += `
                    <tr>
                        <td class="text-left" style="font-weight: 600;">${m.name || m.site || m.nerve}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.onset || m.distalLatency || m.latency || '-'}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.amp || m.opAmp || m.amplitude || '-'}</td>
                        <td>${m.dist || '-'}</td>
                        <td class="${m.abnormal ? 'abnormal-value' : ''}">${m.velocity || m.vel || m.cv || '-'}</td>
                    </tr>
                `;
            });
            html += '</tbody></table></div>';
        }

        if (comparison && comparison.length > 0) {
            html += '<div class="cadwell-table-container">';
            html += '<h4 class="clinical-report-header">Specialized Studies (H-Reflex / RNS / Comparison)</h4>';
            html += `
                <table class="clinical-report-table">
                    <thead>
                        <tr>
                            <th class="text-left">Study Detail</th>
                            <th>Measure A</th>
                            <th>Measure B</th>
                            <th>Difference / Result</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            comparison.forEach(c => {
                html += `
                    <tr>
                        <td class="text-left" style="font-weight: 600;">${c.name || c.site}</td>
                        <td>${c.median ? c.median.peak : (c.measureA || '-')}</td>
                        <td>${c.ulnar ? c.ulnar.peak : (c.measureB || '-')}</td>
                        <td class="${c.abnormal ? 'abnormal-value' : ''}">${c.deltaP || '-'}</td>
                    </tr>
                `;
            });
            html += '</tbody></table></div>';
        }

        return html;
    },

    generateEMGTable: function (emgFindings) {
        if (!emgFindings || emgFindings.length === 0) return '';

        let html = '<div class="cadwell-table-container">';
        html += '<h4 class="clinical-report-header">Needle EMG Examination Details</h4>';
        html += `
            <table class="clinical-report-table">
                <thead>
                    <tr>
                        <th class="text-left">Muscle</th>
                        <th>Ins Act</th>
                        <th>Fib/PSW</th>
                        <th>Fascic</th>
                        <th>MUAP Amp</th>
                        <th>MUAP Dur</th>
                        <th>Recruitment</th>
                    </tr>
                </thead>
                <tbody>
        `;

        emgFindings.forEach(f => {
            const hasDenervation = (f.fibs && f.fibs !== '0' && f.fibs !== 'None' && f.fibs !== 'Nml') ||
                (f.spontaneousActivity && f.spontaneousActivity !== 'None' && f.spontaneousActivity !== '0');

            html += `
                <tr>
                    <td class="text-left" style="font-weight: 600;">${f.muscle}</td>
                    <td>${f.insAct || f.insertionalActivity || 'Nml'}</td>
                    <td class="${hasDenervation ? 'abnormal-value' : ''}">${f.fibs || f.spontaneousActivity || '0'}</td>
                    <td class="${(f.fascic && f.fascic !== '0' && f.fascic !== 'None') ? 'abnormal-value' : ''}">${f.fascic || '0'}</td>
                    <td class="${(f.amp && f.amp !== 'Nml') ? 'abnormal-value' : ''}">${f.amp || f.motorUnits || 'Nml'}</td>
                    <td>${f.dur || 'Nml'}</td>
                    <td class="${(f.recruitment && f.recruitment !== 'Normal' && f.recruitment !== 'Nml') ? 'abnormal-value' : ''}">${f.recrt || f.recruitment || 'Nml'}</td>
                </tr>
            `;
        });

        html += '</tbody></table></div>';
        return html;
    }
};
