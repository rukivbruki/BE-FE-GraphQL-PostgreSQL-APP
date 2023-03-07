import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://127.0.0.1:5173/');
});

test.describe('Show the table and transaction details by filters or search', () => {
    test('should be shown by filters', async ({page}) => {
        await page.getByRole('combobox', {name: 'Bank:'}).selectOption('Business SuperBank');
        await page.getByRole('combobox', {name: 'Account:'}).selectOption('Mr. Kevin (Bills)');
        await page.getByLabel('Start date:').fill('2018-01-01');
        await page.locator('div').filter({hasText: 'Search transaction'}).nth(3).click();
        await page.locator('#date').nth(1).fill('2021-01-01');
        await page.locator('div').filter({hasText: 'Search transaction'}).nth(2).click();
        await page.getByRole('link', {name: '2020-11-02 2725 EUR Calving Administrate Imperatorian Refunds'}).click();
        await page.getByRole('link', {name: 'Back to transactions list'}).click();
    })

    test('should be shown by search', async ({page}) => {
        await page.getByPlaceholder('Type to search...').click();
        await page.getByPlaceholder('Type to search...').fill('Business');
        await page.waitForTimeout(2000);
        await page.getByPlaceholder('Type to search...').press('Tab');
        await page.getByRole('link', {name: '2022-02-26 -2947 GBP Volitation Holdfast Tentiginous Other Expenses'}).click();
        await page.getByRole('link', {name: 'Back to transactions list'}).click();
    });
});

test.describe('Show the table after pressing the pagination button', () => {
    test('should be shown if bank select', async ({page}) => {
        await page.getByRole('combobox', {name: 'Bank:'}).selectOption('Business SuperBank');
        await page.getByRole('button', {name: 'Pagination'}).click();
        await expect(page.getByTestId('transaction-list')).toBeVisible();
    })

    test('should be shown if account select', async ({page}) => {
        await page.getByRole('combobox', {name: 'Account:'}).selectOption('Mr. Kevin (Bills)');
        await page.getByRole('button', {name: 'Pagination'}).click();
        await expect(page.getByTestId('transaction-list')).toBeVisible();
    })
    test('should be shown if date field', async ({page}) => {
        await page.locator('#date').nth(1).fill('2023-03-07');
        await page.locator('div').filter({hasText: 'Search transaction'}).nth(2).click();
        await page.getByRole('button', {name: 'Pagination'}).click();
        await expect(page.getByTestId('transaction-list')).toBeVisible();
    })
    test('should be shown if search', async ({page}) => {
        await page.getByPlaceholder('Type to search...').click();
        await page.getByPlaceholder('Type to search...').fill('Business');
        await page.waitForTimeout(2000);
        await page.getByPlaceholder('Type to search...').press('Tab');
        await page.getByRole('button', {name: 'Pagination'}).click();
        await expect(page.getByTestId('transaction-list')).toBeVisible();

    });
});
