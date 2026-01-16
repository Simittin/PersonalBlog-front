import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { Project } from '../../../../core/models/project';

@Component({
    selector: 'app-project-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './project-form.component.html',
    styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
    projectForm: FormGroup;
    isEditMode = false;
    projectId: string | null = null;
    loading = false;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private contentService: ContentService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.projectForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            technologies: ['', Validators.required],
            githubUrl: [''],
            imageUrl: [''],
            link: [''],
            date: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.projectId = params['id'];
                this.loadProject(this.projectId!);
            }
        });
    }

    loadProject(id: string) {
        this.loading = true;
        this.contentService.getProjectById(id).subscribe({
            next: (project) => {
                this.projectForm.patchValue({
                    title: project.title,
                    description: project.description,
                    technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies,
                    githubUrl: project.githubUrl,
                    imageUrl: project.imageUrl,
                    link: project.link,
                    date: project.date
                });
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading project', err);
                this.loading = false;
            }
        });
    }

    get f() { return this.projectForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.projectForm.invalid) {
            return;
        }

        this.loading = true;
        const formValue = this.projectForm.value;

        // Convert technologies string back to array if needed, currently API might expect comma separated string or array depending on implementation
        // But based on ContentService it splits string to array on get, so we should probably send string or array.
        // Let's assume sending array is cleaner or keeping as is if backend handles it.
        // However, looking at ContentService `createProject` sends `Project` type. 
        // `Project` interface says `technologies: string[]`. 
        // So we must convert the comma separated string to array.

        const projectData: Project = {
            ...formValue,
            id: this.isEditMode ? Number(this.projectId) : 0, // ID handling might depend on backend
            technologies: formValue.technologies.split(',').map((t: string) => t.trim())
        };

        if (this.isEditMode) {
            this.contentService.updateProject(projectData).subscribe({
                next: () => {
                    this.loading = false;
                    this.router.navigate(['/admin/projects']);
                },
                error: (err) => {
                    console.error('Error updating project', err);
                    this.loading = false;
                }
            });
        } else {
            this.contentService.createProject(projectData).subscribe({
                next: () => {
                    this.loading = false;
                    this.router.navigate(['/admin/projects']);
                },
                error: (err) => {
                    console.error('Error creating project', err);
                    this.loading = false;
                }
            });
        }
    }
}
