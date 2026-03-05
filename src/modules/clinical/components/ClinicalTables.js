export const ClinicalTables = {
    formatKinetic: function (val, isAbnormal, type) {
        if (!val || val === '-' || val === 'Nml') return val || '-';

        let abClass = '';
        if (isAbnormal) {
            if (type === 'latency') abClass = 'value-pulse-high';
            else if (type === 'ampcv') abClass = 'value-pulse-low';
            else abClass = 'abnormal-value';
        }

        // Extract number for kinetic animation if possible
        const strVal = String(val).trim();
        const numMatch = strVal.match(/^([<>]?\s*)(\d*\.?\d+)(\s*[a-zA-Z%]*)$/);

        if (numMatch && !isNaN(parseFloat(numMatch[2]))) {
            const prefix = numMatch[1];
            const num = numMatch[2];
            const suffix = numMatch[3];
            return `<span class="${abClass} kinetic-number" data-target="${num}" data-prefix="${prefix}" data-suffix="${suffix}">0${suffix}</span>`;
        }

        return `<span class="${abClass}">${val}</span>`;
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
                        <td>${this.formatKinetic(s.onset, false, 'latency')}</td>
                        <td>${this.formatKinetic(s.peak || s.peakLatency, s.abnormal, 'latency')}</td>
                        <td>${this.formatKinetic(s.amp || s.ptAmp || s.amplitude, s.abnormal, 'ampcv')}</td>
                        <td>${this.formatKinetic(s.dist, false, 'dist')}</td>
                        <td>${this.formatKinetic(s.velocity || s.vel || s.cv, s.abnormal, 'ampcv')}</td>
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
                        <td>${this.formatKinetic(m.onset || m.distalLatency || m.latency, m.abnormal, 'latency')}</td>
                        <td>${this.formatKinetic(m.amp || m.opAmp || m.amplitude, m.abnormal, 'ampcv')}</td>
                        <td>${this.formatKinetic(m.dist, false, 'dist')}</td>
                        <td>${this.formatKinetic(m.velocity || m.vel || m.cv, m.abnormal, 'ampcv')}</td>
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
                const mA = c.median ? c.median.peak : c.measureA;
                const mB = c.ulnar ? c.ulnar.peak : c.measureB;
                html += `
                    <tr>
                        <td class="text-left" style="font-weight: 600;">${c.name || c.site}</td>
                        <td>${this.formatKinetic(mA, false, 'latency')}</td>
                        <td>${this.formatKinetic(mB, false, 'latency')}</td>
                        <td>${this.formatKinetic(c.deltaP || c.result, c.abnormal, 'latency')}</td>
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
            const hasFascic = (f.fascic && f.fascic !== '0' && f.fascic !== 'None');
            const abAmp = (f.amp && f.amp !== 'Nml');
            const abRecrt = (f.recruitment || f.recrt) && (f.recruitment !== 'Normal' && f.recruitment !== 'Nml' && f.recrt !== 'Nml' && f.recrt !== 'Normal');

            html += `
                <tr>
                    <td class="text-left" style="font-weight: 600;">${f.muscle}</td>
                    <td>${this.formatKinetic(f.insAct || f.insertionalActivity || 'Nml', false, 'other')}</td>
                    <td>${this.formatKinetic(f.fibs || f.spontaneousActivity || '0', hasDenervation, 'latency')}</td>
                    <td>${this.formatKinetic(f.fascic || '0', hasFascic, 'latency')}</td>
                    <td>${this.formatKinetic(f.amp || f.motorUnits || 'Nml', abAmp, 'other')}</td>
                    <td>${this.formatKinetic(f.dur || 'Nml', false, 'other')}</td>
                    <td>${this.formatKinetic(f.recrt || f.recruitment || 'Nml', abRecrt, 'ampcv')}</td>
                </tr>
            `;
        });

        html += '</tbody></table></div>';
        return html;
    }
};
