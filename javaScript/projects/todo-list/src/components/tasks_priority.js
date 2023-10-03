import IconFlag from '../assets/icons/flag.svg';
import IconCheck from '../assets/icons/check_small.svg';
import '../styles/tasks_priority.css';

// creates a modal for priority options
export default function buildPriorityOptions(e) {
    console.log(e.currentTarget);
    priorityOptions.init(e);
    const bounds = e.currentTarget.getBoundingClientRect()
    console.log(bounds)

    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'task_priorities';
    dialogElement.appendChild(priorityOptions.render());

    dialogElement.style.width = bounds.width + 'px';
    dialogElement.style.top = bounds.bottom + 'px';
    dialogElement.style.left = bounds.x + 'px';
    document.body.appendChild(dialogElement);

    priorityOptions.cacheDOM();
    priorityOptions.bindEvents();
    dialogElement.showModal();
}

const priorityOptions = {
    priority: null,
    btnPriority: null,
    btnPriorityText: null,
    btnFlag: null,
    init: function(e) {
        this.btnPriority = e.currentTarget;
        this.btnPriorityText = this.btnPriority.querySelector('.task_priority');
        this.btnFlag = this.btnPriority.querySelector('.img_wrapper_flag').firstChild;
        this.priority = parseInt(e.currentTarget.parentElement.querySelector('#priority').value);
        console.log(this.btnFlag.className)
    },
    cacheDOM: function() {
        this.dialogElement = document.querySelector('#task_priorities');
        this.inputPriority = document.querySelector('#priority');
        this.options = document.querySelectorAll('.option');
    },
    bindEvents: function() {
        this.closeModal = this.closeModal.bind(this);
        this.select = this.select.bind(this);
        this.dialogElement.addEventListener('click', this.closeModal);
        this.options.forEach(option => option.addEventListener('click', this.select))
    },
    render: function() {
        const optionsWrapper = document.createElement('div');
        const optionsList = document.createElement('ul');
        optionsWrapper.classList.add('container');

        for (let i = 1; i <= 4; i++) {
            const option = document.createElement('li');
            const imageWrapper = document.createElement('div');
            const span = document.createElement('span');

            const image = new Image();
            image.src = IconFlag;
            image.setAttribute('onload', 'SVGInject(this)');
            image.classList.add(`priority_${i}`);
            imageWrapper.classList.add('img_wrapper_flag');
            option.classList.add('option')
            option.dataset.value = i;
            span.textContent = `Priority ${i}`
        
            imageWrapper.appendChild(image);
            option.appendChild(imageWrapper);
            option.appendChild(span);
            if (i === this.priority) {
                option.classList.add(`selected`);
                const imgCheck = new Image();
                imgCheck.src = IconCheck;
                imgCheck.classList.add('option_selected_checkmark');
                imgCheck.setAttribute('onload', 'SVGInject(this)');

                option.appendChild(imgCheck);
            }
            optionsList.appendChild(option);
        }

        optionsWrapper.appendChild(optionsList);
        return optionsWrapper;
    },
    closeModal: function(e) {
        if (e.target.tagName === 'DIALOG') {
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    },
    select: function(e) {
        console.log(e.currentTarget);
        console.log(parseInt(e.currentTarget.dataset.value));
        this.inputPriority.value = parseInt(e.currentTarget.dataset.value);
        this.btnPriorityText.textContent = `P${this.inputPriority.value}`;
        this.btnFlag.className.baseVal = `priority_${this.inputPriority.value}`;
        this.removeModal();
    },
    watchScreen: function() {
        // run this.removeModal only once
    },
}