export class ReportWriter {
    constructor(competencyManager) {
        this.competencyManager = competencyManager;
    }

    showMode(mode) {
        // Hide all report mode contents
        document.querySelectorAll('.report-mode-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all mode buttons
        document.querySelectorAll('.report-mode-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected mode content
        const selectedContent = document.getElementById(`report-${mode}`);
        const selectedButton = document.querySelector(`[data-mode="${mode}"]`);

        if (selectedContent) selectedContent.classList.add('active');
        if (selectedButton) selectedButton.classList.add('active');

        console.log(`Report mode switched to: ${mode}`);
    }

    showTemplateLevel(level) {
        // Hide all template levels
        document.querySelectorAll('.template-level').forEach(templateLevel => {
            templateLevel.classList.remove('active');
        });

        // Remove active class from all level buttons
        document.querySelectorAll('.template-level-btn').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected template level
        const selectedLevel = document.getElementById(`template-level-${level}`);
        const selectedButton = document.querySelector(`[data-level="${level}"]`);

        if (selectedLevel) selectedLevel.classList.add('active');
        if (selectedButton) selectedButton.classList.add('active');

        // Update competency progress for report writing
        if (this.competencyManager) {
            this.competencyManager.updateLevel('reporting', level);
        }

        console.log(`Template level switched to: ${level}`);
    }
}
