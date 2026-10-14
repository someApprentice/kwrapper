import { ProjectDTO } from '@/services/projects';
import { defineStore } from 'pinia';

import { ref } from 'vue';

import { query, execute } from '@/services/db';
import { capSQLiteSet } from '@capacitor-community/sqlite';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<ProjectDTO[]>([]);

  async function init() {
    const results = await query('SELECT * FROM projects', []);

    projects.value = results
      .map(result => {
        result.payer = JSON.parse(result.payer);
        result.files = JSON.parse(result.files);

        return result;
      })
      .sort((a, b) => b.activated_at - a.activated_at);
  }

  async function save(p: ProjectDTO[]) {
    if (p.length === 0) return;

    const statements = projects.value.map(project => {
      // @TODO move this logic to separate function.
      const keys = Object.keys(project);
      const values = Object.values(project).map(value => typeof value === 'object' ? JSON.stringify(value) : value);

      const columns = keys.join(',');
      const placeholders = keys.map(() => '?').join(',');

      const statement = `INSERT INTO projects (${columns}) VALUES (${placeholders})`;

      return {
        statement,
        values
      };
    });

    await execute(statements);

    projects.value = p
      .reduce((acc, cur) => {
        const index = acc.findIndex(project => project.id == cur.id);

        if (index !== -1) {
          acc[index] = cur;
          return acc;
        }

        acc.push(cur);

        return acc;
      }, projects.value)
      .sort((a, b) => b.activated_at - a.activated_at);
  }

  async function merge(p: ProjectDTO[]) {
    if (p.length === 0) return;

    const ids = p.map(project => project.id);

    const placeholders = ids.map(() => '?').join(',');

    const results = await query<ProjectDTO>(`SELECT * FROM projects WHERE id IN (${placeholders})`, ids);

    const insert = p.filter(project => !results.some(result => result.id === project.id));
    const update = p.filter(project => results.some(result => result.id === project.id));

    const statements = ([] as capSQLiteSet[])
      .concat(
        insert.map(project => {
          // @TODO move this logic to separate function.
          const keys = Object.keys(project);
          const values = Object.values(project).map(value => typeof value === 'object' ? JSON.stringify(value) : value);

          const columns = keys.join(',');
          const placeholders = keys.map(() => '?').join(',');

          const statement = `INSERT INTO projects (${columns}) VALUES (${placeholders})`;

          return {
            statement,
            values
          };
        }),
        update.map(project => {
          // @TODO move this logic to separate function.
          const keys = Object.keys(project);
          const values = Object.values(project).map(value => typeof value === 'object' ? JSON.stringify(value) : value);

          const sets = keys.map(key => `${key} = ?`).join(',');

          const statement = `UPDATE projects SET ${sets} WHERE id = ?`;

          values.push(project.id);

          return {
            statement,
            values
          };
        })
      );

    await execute(statements);

    projects.value = p
      .reduce((acc, cur) => {
        const index = acc.findIndex(project => project.id == cur.id);

        if (index !== -1) {
          acc[index] = cur;
          return acc;
        }

        acc.push(cur);

        return acc;
      }, projects.value)
      .sort((a, b) => b.activated_at - a.activated_at);
  }

  return {
    projects,
    init,
    save,
    merge
  };
});
