export class DiagnosisReference {
    constructor() {
    }

    showCategory(category) {
        // Hide all diagnosis category contents
        document.querySelectorAll('.diagnosis-category-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all category buttons
        document.querySelectorAll('.diagnosis-category-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected category content
        const selectedContent = document.getElementById(`diagnosis-${category}`);
        const selectedButton = document.querySelector(`[data-category="${category}"]`);

        if (selectedContent) selectedContent.classList.add('active');
        if (selectedButton) selectedButton.classList.add('active');

        console.log(`Diagnosis category switched to: ${category}`);
    }
}
