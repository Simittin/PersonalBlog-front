import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContentService } from '../../../../core/services/content.service';
import { BlogPost } from '../../../../core/models/blog-post';

@Component({
    selector: 'app-blog-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './blog-form.component.html',
    styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit {
    blogForm: FormGroup;
    isEditMode = false;
    blogId: string | null = null;
    loading = false;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private contentService: ContentService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.blogForm = this.fb.group({
            title: ['', Validators.required],
            summary: ['', Validators.required],
            content: ['', Validators.required],
            imageUrl: [''],
            author: ['Admin'],
            category: ['General'],
            readingTime: [5, [Validators.required, Validators.min(1)]],
            publishDate: [new Date().toISOString().substring(0, 10)]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.isEditMode = true;
                this.blogId = params['id'];
                this.loadBlog(this.blogId!);
            }
        });
    }

    loadBlog(id: string) {
        this.loading = true;
        this.contentService.getBlogById(id).subscribe({
            next: (blog) => {
                this.blogForm.patchValue({
                    title: blog.title,
                    summary: blog.summary,
                    content: blog.content,
                    imageUrl: blog.imageUrl,
                    author: blog.author,
                    category: blog.category,
                    readingTime: blog.readingTime,
                    publishDate: blog.publishDate instanceof Date
                        ? blog.publishDate.toISOString().substring(0, 10)
                        : new Date(blog.publishDate).toISOString().substring(0, 10)
                });
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading blog', err);
                this.loading = false;
            }
        });
    }

    get f() { return this.blogForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.blogForm.invalid) {
            return;
        }

        this.loading = true;
        const formValue = this.blogForm.value;

        const blogData: BlogPost = {
            ...formValue,
            id: this.isEditMode ? this.blogId : 0,
            publishDate: new Date(formValue.publishDate)
        };

        if (this.isEditMode) {
            this.contentService.updateBlog(blogData).subscribe({
                next: () => {
                    this.loading = false;
                    this.router.navigate(['/admin/blog']);
                },
                error: (err) => {
                    console.error('Error updating blog', err);
                    this.loading = false;
                }
            });
        } else {
            this.contentService.createBlog(blogData).subscribe({
                next: () => {
                    this.loading = false;
                    this.router.navigate(['/admin/blog']);
                },
                error: (err) => {
                    console.error('Error creating blog', err);
                    this.loading = false;
                }
            });
        }
    }
}
