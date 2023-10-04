import IconFlag from '../assets/icons/flag.svg';
import IconCheck from '../assets/icons/check_small.svg';
import IconProject from '../assets/icons/circle.svg';
import '../styles/tasks_priority.css';

// creates a modal for priority options
export default function buildPriorityOptions(e) {
    priorityOptions.init(e);

    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'task_priorities';
    dialogElement.appendChild(priorityOptions.render());

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
    observer: null,
    media: window.matchMedia('(min-width: 768px)'),
    init: function(e) {
        this.btnPriority = e.currentTarget;
        this.btnPriorityText = this.btnPriority.querySelector('.task_priority');
        this.btnFlag = this.btnPriority.querySelector('.img_wrapper_flag').firstChild;
        this.priority = parseInt(e.currentTarget.parentElement.querySelector('#priority').value);
        this.formItem = this.btnPriority.parentElement;
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
        
        this.callBack = this.callBack.bind(this);
        this.observer = new ResizeObserver(this.callBack);
        this.observer.observe(this.formItem);

        this.media.addEventListener('change', () => {
            this.removeModal();
        })

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
        this.observer.unobserve(this.btnPriority);
    },
    select: function(e) {
        this.inputPriority.value = parseInt(e.currentTarget.dataset.value);
        this.btnPriorityText.textContent = `P${this.inputPriority.value}`;
        this.btnFlag.className.baseVal = `priority_${this.inputPriority.value}`;
        this.removeModal();
    },
    callBack: function(entries) {
        for (let entry of entries) {
            if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    const bounds = entry.target.getBoundingClientRect();
                    this.dialogElement.style.width = bounds.width + 'px';
                    if ((this.dialogElement.offsetHeight + bounds.bottom) > window.innerHeight) {
                        // if the dialog's height and form item's bottom is greater than window height
                        this.dialogElement.style.transform = `translate(${bounds.x}px, ${bounds.top - this.dialogElement.offsetHeight}px)`;
                    } else {
                        this.dialogElement.style.transform = `translate(${bounds.x}px, ${bounds.bottom}px)`;
                    }
                }
            }
        }
    },
}