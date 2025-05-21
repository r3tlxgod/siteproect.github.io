document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const muscleGroupFilter = document.getElementById('muscleGroupFilter');
    const exerciseCards = document.querySelectorAll('.exercise-card');

    function filterAndSearchExercises() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedMuscleGroup = muscleGroupFilter.value;

        exerciseCards.forEach(card => {
            const exerciseName = card.dataset.name.toLowerCase();
            // Убедимся, что data-muscles существует перед вызовом split
            const muscleGroupsAttribute = card.dataset.muscles || ""; 
            const muscleGroups = muscleGroupsAttribute.toLowerCase().split(',');

            const nameMatch = exerciseName.includes(searchTerm);
            const muscleMatch = (selectedMuscleGroup === 'all') || muscleGroups.some(mg => mg.trim() === selectedMuscleGroup);

            if (nameMatch && muscleMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    searchInput.addEventListener('input', filterAndSearchExercises);
    muscleGroupFilter.addEventListener('change', filterAndSearchExercises);

    // Первоначальная фильтрация при загрузке, если нужно
    // filterAndSearchExercises();
});
