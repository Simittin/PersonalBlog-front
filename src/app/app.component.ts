import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Navbar ve Footer importlarını buradan kaldırabilirsin, artık Layout yönetiyor.



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-blog-portfolio';
}
