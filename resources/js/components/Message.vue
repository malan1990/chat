<template>
    <div>
       <li :class="className" class="list-group-item list-group-item-action"><slot></slot></li>
       <small class="badge float-right" :class="badgeClass">{{user}}</small>
       <small class="badge float-left" >{{time}}</small>

    </div>
</template>
<script>
export default {
    props: [
        'color',
        'user',
        'time'
    ],
    computed: {
        className(){
            return 'list-group-item-' + this.color
        },
        badgeClass(){
            return 'badge-' + this.color
        }
    }


}
</script>
<style>

</style>
