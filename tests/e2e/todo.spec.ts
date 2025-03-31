import { test, expect } from '@playwright/test';

test('tester l\'ajout d\'une todo', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Cliquer sur le bouton Ajouter
    await page.getByRole('button', { name: 'Ajouter' }).click();
    
    // Remplir le formulaire
    await page.getByRole('textbox', { name: 'Ajouter une todo' }).fill('Nouvelle tâche');
    await page.getByRole('combobox').selectOption('À FAIRE');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Ajouter' }).click();
    
    // Vérifier que la todo apparaît dans le tableau
    await expect(page.getByRole('cell', { name: 'Nouvelle tâche' })).toBeVisible();
});

test('tester la modification d\'une todo', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Cliquer sur le bouton Modifier de la première todo
    await page.getByRole('button', { name: 'Modifier' }).first().click();
    
    // Modifier le formulaire
    await page.getByRole('textbox', { name: 'Ajouter une todo' }).fill('Tâche modifiée');
    await page.getByRole('combobox').selectOption('FAIT');
    
    // Soumettre le formulaire
    await page.getByRole('button', { name: 'Modifier' }).click();
    
    // Vérifier que la todo a été modifiée
    await expect(page.getByRole('cell', { name: 'Tâche modifiée' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'FAIT' })).toBeVisible();
});

test('tester la suppression d\'une todo', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Cliquer sur le bouton Supprimer de la première todo
    const button = page.getByRole('button', { name: 'Supprimer' }).first();
    await button.click();

    // Vérifier que la todo a été supprimée
    const cell = page.getByRole('cell', { name: 'Nouvelle tâche' });
    expect(cell).toBeHidden();
});



